/**
 * Test environment setup for Jest.
 *
 * This file is executed after Jest is configured but before the test suite runs.
 * It loads `@testing-library/jest-dom`, which extends Jest's `expect` with
 * custom matchers for asserting on DOM nodes (e.g., `toHaveTextContent`,
 * `toBeInTheDocument`, `toBeDisabled`).
 *
 * Keep this file lightweight: only global setup that every test requires should
 * be imported here to avoid unnecessary overhead per test run.
 *
 * Learn more: https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom';