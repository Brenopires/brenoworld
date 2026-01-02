import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase server environment variables')
}

// Server-side client with service role key (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

/**
 * Create a client for authenticated requests
 * @param {string} accessToken - The user's access token from cookie/header
 * @returns {Object} - Supabase client scoped to the user
 */
export function createAuthenticatedClient(accessToken) {
  return createClient(supabaseUrl, process.env.SUPABASE_ANON_KEY || '', {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

/**
 * Parse cookies from request headers
 * @param {string} cookieHeader - The cookie header string
 * @returns {Object} - Parsed cookies as key-value pairs
 */
function parseCookies(cookieHeader) {
  if (!cookieHeader) return {}

  return cookieHeader
    .split(';')
    .map(cookie => cookie.trim().split('='))
    .reduce((acc, [key, value]) => {
      if (key && value) {
        acc[key] = decodeURIComponent(value)
      }
      return acc
    }, {})
}

/**
 * Get user from request (checks for auth token in cookies or headers)
 * @param {Request} req - The request object
 * @returns {Promise<Object|null>} - User object or null
 */
export async function getUser(req) {
  try {
    // Try to get token from cookie first
    const cookieHeader = req.headers.cookie
    let accessToken = null

    if (cookieHeader) {
      const cookies = parseCookies(cookieHeader)
      // Supabase stores tokens in cookies with specific names
      accessToken = cookies['sb-access-token'] || cookies['supabase-auth-token']
    }

    // Fallback to Authorization header
    if (!accessToken) {
      const authHeader = req.headers.authorization
      if (authHeader && authHeader.startsWith('Bearer ')) {
        accessToken = authHeader.substring(7)
      }
    }

    if (!accessToken) return null

    // Verify the token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)

    if (error || !user) return null

    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

/**
 * Check if request has valid authentication
 * @param {Request} req - The request object
 * @returns {Promise<Object>} - User object
 * @throws {Error} - If not authenticated
 */
export async function checkAuth(req) {
  const user = await getUser(req)

  if (!user) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  return user
}

/**
 * Check if request has valid admin authentication
 * @param {Request} req - The request object
 * @returns {Promise<Object>} - User object
 * @throws {Error} - If not authenticated or not admin
 */
export async function checkAdmin(req) {
  const user = await checkAuth(req)

  // Check if user is admin (breno@familiapires.com.br)
  if (user.email !== 'breno@familiapires.com.br') {
    const error = new Error('Forbidden: Admin access required')
    error.statusCode = 403
    throw error
  }

  return user
}

/**
 * Get Supabase admin client (bypasses RLS)
 * Use this for operations that need full database access
 * @returns {Object} - Supabase admin client
 */
export function getSupabaseAdmin() {
  return supabaseAdmin
}
