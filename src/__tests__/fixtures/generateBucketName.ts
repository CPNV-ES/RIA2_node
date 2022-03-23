/**
 * This function ensures each test suits are using a unique bucket name as the
 * tests suits are running in parallel.
 */
export function generateBucketName() {
  return `test-bucket-${Math.random().toString().substring(2)}`;
}
