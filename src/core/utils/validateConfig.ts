export default function validateConfig(config): ( string | null ) {
  if (!Array.isArray(config.steps)) {
    return 'No steps provided!';
  }
  return null;
}