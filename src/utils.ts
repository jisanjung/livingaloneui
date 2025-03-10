export const convertToCurrency = (number: number) => {
    /**
     * Converts a number into a currency format based on its digit length:
     * - Single digit: cents (e.g., "3" -> "0.03")
     * - Double digit: cents (e.g., "30" -> "0.30")
     * - Triple digit or more: dollars (e.g., "300" -> "3.00", "3000" -> "30.00")
     * Adds commas for USD formatting when necessary.
     *
     * @param {number} number - The number to convert
     * @return {string} - Formatted currency
     */

    // Ensure the input is treated as a string for consistent digit length processing
    const numberStr = number.toString();
    const length = numberStr.length;

    if (length === 1) { // Single digit
        return `0.0${numberStr}`;
    } else if (length === 2) { // Double digit
        return `0.${numberStr.padStart(2, '0')}`;
    } else { // Triple digit or more
        const dollars = numberStr.slice(0, -2);
        const cents = numberStr.slice(-2);
        const formattedDollars = parseInt(dollars).toLocaleString('en-US');
        return `${formattedDollars}.${cents.padStart(2, '0')}`;
    }
};