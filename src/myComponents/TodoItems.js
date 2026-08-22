import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
 * Palette of Bootstrap border variants used to color-code todo cards.
 */
const BORDER_COLORS = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
  'light',
];

/**
 * TodoItems renders a single todo entry as a colored Bootstrap Card.
 *
 * @param {Object} props - React component props.
 * @param {Object} props.todos - The todo item to display. Expected shape:
 *   { title?: string, desc?: string }.
 * @param {number} [props.index=0] - Position used to select a border color.
 *   Values outside the palette range fall back to the first color.
 * @param {Function} props.ONDelete - Callback fired when the delete button is
 *   pressed. Receives the todo object as its argument.
 * @returns {JSX.Element|null} The rendered todo card, or null if data is invalid.
 */
export default function TodoItems({ todos, index = 0, ONDelete }) {
  // Validate the todo object before rendering.
  if (!todos || typeof todos !== 'object') {
    console.error('TodoItems: invalid todo prop received', todos);
    return null;
  }

  // Normalize displayed fields with safe fallbacks.
  const title = todos.title || 'Untitled';
  const desc = todos.desc || 'No description';

  // Clamp the index to a valid border color position.
  const safeIndex =
    Number.isInteger(index) && index >= 0 && index < BORDER_COLORS.length
      ? index
      : 0;

  /**
   * Handles deletion by validating the callback and passing the todo item.
   */
  const handleDelete = () => {
    if (typeof ONDelete !== 'function') {
      console.error('TodoItems: ONDelete prop must be a function');
      return;
    }
    ONDelete(todos);
  };

  return (
    <div>
      <Card border={BORDER_COLORS[safeIndex]} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {desc}
            <br />
            <Button
              variant="danger"
              size="sm"
              className="my-3"
              onClick={handleDelete}
              aria-label={`Delete todo: ${title}`}
            >
              Delete
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

TodoItems.propTypes = {
  todos: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
  ONDelete: PropTypes.func.isRequired,
};