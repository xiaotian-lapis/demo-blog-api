/**
 * Simulates a database call with a random delay and a 10% chance of an error
 * @param data data should return
 */
export const simulateDatabaseIO = <T>(data: T): Promise<T> => {
    const delay = Math.floor(Math.random() * 5000); // Random delay up to 5 seconds
    const shouldThrowError = Math.random() < 0.1;  // 10% chance of an error

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldThrowError) {
                reject(new Error("Internal Server Error!"));
            } else {
                resolve(data);
            }
        }, delay);
    });
};
