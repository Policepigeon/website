// Function to toggle themes
const toggleTheme = () => {
  let currentTheme = localStorage.getItem('theme') || 'catppuccin-macchiato';
  
  if (currentTheme === 'catppuccin-macchiato') {
    currentTheme = 'catppuccin-latte';
  } else if (currentTheme === 'catppuccin-latte') {
    currentTheme = 'synthwave';
  } else {
    currentTheme = 'catppuccin-macchiato';
  }
  
  localStorage.setItem('theme', currentTheme);
  document.body.className = currentTheme;
};

// Apply the theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'catppuccin-macchiato';
  document.body.className = savedTheme;
});
