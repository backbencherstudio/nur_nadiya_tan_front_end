import { toast } from 'react-toastify'

export const handleAuthError = (error: any, router: any) => {
  // Check if it's a 401 Unauthorized error
  if (error?.response?.status === 401) {
    // Remove token from cookies
    document.cookie = 'jobtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    // Show error message
    toast.error("Session expired. Please login again.")
    
    // Redirect to login page
    router.push("/login")
    
    return true // Indicates that the error was handled
  }
  
  return false // Error was not handled
}

// Alternative function for use outside of components
export const handleAuthErrorOutsideComponent = (error: any) => {
  // Check if it's a 401 Unauthorized error
  if (error?.response?.status === 401) {
    // Remove token from cookies
    document.cookie = 'jobtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    // Show error message
    toast.error("Session expired. Please login again.")
    
    // Redirect to login page
    window.location.href = "/login"
    
    return true // Indicates that the error was handled
  }
  
  return false // Error was not handled
}
