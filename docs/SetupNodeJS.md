# Setup NodeJS for tests and development

`NodeJS` is a program used to verify your solutions. It allows you to run automatic tests that check to make sure your solution fits the requirements. It is also used to launch your solution in the browser locally.

In a nutshell, automatic tests are written in the `JavaScript` programming language, and `NodeJS` allows you to run them. It's ok if you don't know what `JavaScript` is. You don't need to know it, to run tests with it.

When you submit your solution, run tests with `NodeJS` on a remote computer, on your computer if you prefer. 

To prepare an environment on your computer for this, follow the steps below.

You should do these steps only once. 

## Install NodeJS

**Please, skip this step if youv have already installed `NodeJS`.**

First, install `NodeJS`. As already mentioned, `NodeJS` is a program (application) you can install on your computer. 

Based on your operating system you can download it from the main page of the official [NodeJS website](https://nodejs.org/en/).

You must install the version of NodeJS with the prefix `LTS`. `LTS` stands for `Long Term Support` and is a stable version of `NodeJS`.

### Install the required dependencies

**You should do it only once per task**

Using `NodeJS`, often requires additional packages, which have to be installed.

1. Open the terminal(`command line, Bash, Git Bash`).
2. Check the folder path in the terminal, which should be **the root folder of the task**.
3. Run the `NodeJS` command to install the dependencies: `npm install`.

#### Troubleshooting

Sometimes the `npm install` command may fail with an error or a warning. Here are the most common ones.

**Error**: `'npm' is not recognized as an internal or external command...`
**Solution:**
Check to make sure `NodeJS` is installed. Sometimes you need to close the terminal window and open it again to run it.

**Warning:** `npm WARN saveError ENOENT: no such file or directory, open 'C:\**\package.json'`.
**Solution:**
To install the required dependencies, make sure to open the terminal in **root folder of the task**. 
