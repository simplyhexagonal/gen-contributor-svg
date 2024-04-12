# GitHub Contributor SVG Generator

This Node.js script generates an SVG file with a GitHub user's avatar and display name.

## Usage

This project is designed to be run using `npx`. You can run the script directly without installing it locally.

Run the script with the following command:

```
npx gen-contributor-svg --github-username=<GitHub Username> --display-name=<Display Name>
```

- Replace `<GitHub Username>` with the desired GitHub username.
- Optionally, add `--display-name=<Display Name>` to specify a custom display name.

The script will fetch the user's avatar image from GitHub, embed it in a template SVG file, and save the resulting SVG file as `<GitHub Username>.svg`.

## Dependencies

- axios

## License

This project is licensed under the Apache-2.0 License.