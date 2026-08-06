import { render, screen } from '@testing-library/react';
import App from './App';

// Expected text pattern used by the default App smoke test.
const LEARN_REACT_PATTERN = /learn react/i;

/**
 * Validates that the provided React component exists before rendering.
 * Prevents cryptic errors when a component import is missing or broken.
 *
 * @param {Function|Object} component - React component to validate.
 */
function validateComponent(component) {
  if (!component) {
    throw new Error('App component is required but was not imported properly.');
  }
}

/**
 * Renders the App component inside a reusable helper.
 * Encapsulates validation and rendering logic for reuse across tests.
 *
 * @returns {Object} The render utility object from Testing Library.
 */
function renderApp() {
  validateComponent(App);
  return render(<App />);
}

/**
 * Asserts that an element containing the given text pattern is present
 * in the document. Validates the input pattern to fail fast on bad data.
 *
 * @param {string|RegExp} pattern - Text content to search for.
 * @returns {HTMLElement} The matched element.
 */
function expectTextInDocument(pattern) {
  if (
    !pattern ||
    (typeof pattern !== 'string' && !(pattern instanceof RegExp))
  ) {
    throw new Error(
      'expectTextInDocument requires a non-empty string or a valid RegExp.'
    );
  }

  // Query the rendered document for an element matching the text pattern.
  const element = screen.getByText(pattern);

  // Assert that the queried element is actually attached to the document.
  expect(element).toBeInTheDocument();

  return element;
}

describe('App component', () => {
  test('renders learn react link', () => {
    // Render the App component via the reusable helper.
    renderApp();

    // Verify the default "learn react" link is rendered in the document.
    expectTextInDocument(LEARN_REACT_PATTERN);
  });
});