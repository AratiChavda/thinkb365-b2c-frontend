/**
 * Formats a number as currency with localization support
 * 
 * @param amount - The amount to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @param locale - BCP 47 language tag (default: 'en-US')
 * @param options - Additional Intl.NumberFormat options
 * @returns Formatted currency string
 */
export function formatCurrency(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US',
    options: Intl.NumberFormatOptions = {}
  ): string {
    // Handle null/undefined/NaN cases
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '—' // Or return an empty string or other placeholder
    }
  
    // Default options
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  
    // Merge with user options
    const mergedOptions = { ...defaultOptions, ...options }
  
    try {
      return new Intl.NumberFormat(locale, mergedOptions).format(amount)
    } catch (error) {
      console.error('Currency formatting error:', error)
      // Fallback formatting
      return `${currency} ${amount.toFixed(2)}`
    }
  }
  
  /**
   * Shortened currency formatter (e.g., $1.2K, $3.5M)
   * 
   * @param amount - The amount to format
   * @param currency - ISO 4217 currency code (default: 'USD')
   * @param locale - BCP 47 language tag (default: 'en-US')
   * @param decimals - Number of decimal places (default: 1)
   * @returns Formatted currency string in compact notation
   */
  export function formatCurrencyCompact(
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US',
    decimals: number = 1
  ): string {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '—'
    }
  
    const formatter = Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    })
  
    return formatter.format(amount)
  }
  
  /**
   * Formats a number as plain currency (no symbol)
   * 
   * @param amount - The amount to format
   * @param decimals - Number of decimal places (default: 2)
   * @returns Formatted number string
   */
  export function formatCurrencyPlain(
    amount: number,
    decimals: number = 2
  ): string {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '—'
    }
  
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    })
  }
  
  export const Currency = {
    USD: (amount: number) => formatCurrency(amount, 'USD'),
    EUR: (amount: number) => formatCurrency(amount, 'EUR'),
    GBP: (amount: number) => formatCurrency(amount, 'GBP'),
    JPY: (amount: number) => formatCurrency(amount, 'JPY', 'ja-JP', { maximumFractionDigits: 0 }),
    compactUSD: (amount: number) => formatCurrencyCompact(amount, 'USD'),
  }