import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(
      screen.getByRole('textbox', { name: /github username/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted with valid username', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /github username/i });
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'testuser');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('does not call onSearch when form is submitted with empty username', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('trims whitespace from username before searching', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /github username/i });
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '  testuser  ');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('renders sample user buttons', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    expect(
      screen.getByRole('button', { name: 'torvalds' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'gaearon' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'octocat' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'sindresorhus' })
    ).toBeInTheDocument();
  });

  it('calls onSearch when sample user button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const sampleButton = screen.getByRole('button', { name: 'torvalds' });
    await user.click(sampleButton);

    expect(mockOnSearch).toHaveBeenCalledWith('torvalds');
  });

  it('updates input value when sample user is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /github username/i });
    const sampleButton = screen.getByRole('button', { name: 'gaearon' });

    await user.click(sampleButton);

    expect(input).toHaveValue('gaearon');
  });

  it('disables input and button when loading', () => {
    render(<SearchBar onSearch={mockOnSearch} loading={true} />);

    const input = screen.getByRole('textbox', { name: /github username/i });
    const button = screen.getByRole('button', { name: /searching.../i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('shows "Searching..." text when loading', () => {
    render(<SearchBar onSearch={mockOnSearch} loading={true} />);

    expect(
      screen.getByRole('button', { name: /searching.../i })
    ).toBeInTheDocument();
  });

  it('disables search button when username is empty', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: /search/i });

    expect(button).toBeDisabled();
  });

  it('enables search button when username is entered', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /github username/i });
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'testuser');

    expect(button).not.toBeDisabled();
  });

  it('handles keyboard submission (Enter key)', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox', { name: /github username/i });

    await user.type(input, 'testuser');
    await user.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });
});
