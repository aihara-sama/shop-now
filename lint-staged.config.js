module.exports = {
  "[!test]*.{ts,tsx}": ["eslint --fix", "eslint"],
  "**/[!test]*.ts?(x)": () => "npm run check-types",
  "[!test]*.{ts,tsx,json,yaml}": ["prettier --write"],
};
