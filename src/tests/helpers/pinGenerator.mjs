/**
 * Function to generate a random 4-digit PIN
 * Prevents repeating sequences until exhausted, then starts over
 */
const generateRandomPIN = () => {
  // Array to hold all possible PIN combinations
  let pins = [];

  // Generate all possible 4-digit PINs without repeating sequences
  for (let i = 0; i <= 9999; i++) {
    const pin = i.toString().padStart(4, '0');
    if (!hasRepeatedSequence(pin)) {
      pins.push(pin);
    }
  }

  // Shuffle the array of PINs using Fisher-Yates algorithm
  shuffleArray(pins);

  // Index to keep track of the current PIN
  let currentIndex = 0;

  // Return function to generate PINs
  return () => {
    // If all PINs have been used, start over by shuffling the array again
    if (currentIndex >= pins.length) {
      shuffleArray(pins);
      currentIndex = 0;
    }

    // Return the current PIN and increment the index for the next one
    return pins[currentIndex++];
  };
};

/**
 * Function to check if a PIN has a repeated sequence
 * @param {string} pin - The PIN to check
 * @returns {boolean} True if PIN has a repeated sequence, otherwise false
 */
const hasRepeatedSequence = (pin) => {
  return /(\d)\1{2}/.test(pin); // Checks for three consecutive repeated digits
};

/**
 * Function to shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Export a function to create PINs
export default generateRandomPIN;
