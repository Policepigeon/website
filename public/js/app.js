const toggleTheme = () => {
  let theme = localStorage.getItem('theme') || 'catppuccin-macchiato';
  if (theme === 'catppuccin-macchiato') {
    theme = 'catppuccin-latte';
  } else if (theme === 'catppuccin-latte') {
    theme = 'synthwave';
  } else {
    theme = 'catppuccin-macchiato';
  }
  localStorage.setItem('theme', theme);
  document.body.className = theme;
};

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'catppuccin-macchiato';
  document.body.className = savedTheme;
});
