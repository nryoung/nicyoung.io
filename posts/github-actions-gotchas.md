---
title: Github Actions gotchas
date: "2020-08-11"
layout: layouts/base.njk
tags:
  - posts
---

# Github Actions gotchas

*The most powerful tool we have as developers is automation. -- Scott Hanselman.*

## Intro

Recent projects have me moving more and more of our CI/CD pipelines over
to Github Actions from Jenkins. Github Actions has proven to be a breath of
fresh air compared to Jenkins, as it allows us to have configuration that lives
alongside the code it operates on. It has also allowed our teams to iterate
quickly on our CI/CD pipelines and it has been much easier for us to customize
our pipelines to suit our needs per project. That being said, there have been a
few gotchas, some documented and others not. As I run in to more oddities with
Github Actions, I will document them here.

## Using the default `GITHUB_TOKEN` does not trigger workflows

This is actually [documented][triggering-workflows] briefly, but it didn't fully
click with me until I tried to use it. The documentation says it is meant to
prevent recursive worklow runs - which makes sense. I could see a scenario where
you accidentally trigger infinite workflow runs without realizing it.

For example, we have a workflow that adds an `approve` label when a review
approval is added to the PR. It looks similar to the following:

```yaml
name: Label approved pull requests

on:
  - pull_request_review

jobs:
  label-when-approved:
    name: Label when approved
    runs-on: ubuntu-latest
    steps:
    - name: Label when approved
      uses: pullreminders/label-when-approved-action@1.0.5
      env:
        APPROVALS: "1"
        GITHUB_TOKEN: {% raw %} ${{ secrets.PERSONAL_GITHUB_ACCESS_TOKEN }} {% endraw %}
        ADD_LABEL: "approved"
```

You will notice above we are using the default `GITHUB_TOKEN` that is provided
by Github Actions.  In our pipeline we have a subsequent workflow that watches
for this approval label and runs other steps, like `terraform plan` for example:

```yaml
name: Workflow to run on approve

on:
  pull_request:
    types:
      - labeled

jobs:
  workflow-to-run-on-approve:
    name: 'Workflow to run on approve'
    if: github.event.label.name == 'approved'
    runs-on: ubuntu-latest
    # other steps...
```

The subsequent pipeline above will never be triggered because of the use of the
`GITHUB_TOKEN` on the previous workflow, even though the label is added
successfully to the pull request. The resolution to this issue is to generate a
new personal access token to use in the approval workflow above.

## `if` block doesn't require expression syntax

This little gotcha is [documented][context-expressions] as well. Github Actions
allows for expressions in the workflow files and they look something like this:

```yaml
{% raw %} ${{ <expression> }} {% endraw %}
```

However, the expression syntax is not required when it's inside an `if` block.
In fact, as I found out, if you do use the expression syntax inside the `if`
block the if conditional will not evaluate properly. So it's a simple matter of
turning something that looks like this:

```yaml
{% raw %}  if: ${{ contains(github.event.pull_request.labels.*.name, 'approved') }} && ${{ contains(github.event.pull_request.labels.*.name, 'deploy') }} {% endraw %}
```

to something like this:

```yaml
  if: contains(github.event.pull_request.labels.*.name, 'approved') && contains(github.event.pull_request.labels.*.name, 'deploy')
```

## Build matrix variables can sometimes unexpectedly be cached between runs

I could not find documentation describing this behavior, but this is most likely
a transient bug in Github Actions itself. Intermittently we would have build
matrix variables that would cache to their previous values even when we would
change them in the workflow file itself. The solution I came across is to
temporarily change the name of the variable and that seems to bust whatever
internal cache Github has between runs. This one was especially frustrating to
diagnose and the only way we figured it out was by manually combing through the
Github actions logs.

## Github Actions is the future

Working with Github Actions has been probably been one of the most pleasant
experiences I have had with any CI/CD solution (yes, even better than Circle
CI). It just works and integrates seamlessly with git repos and allows you to
host both your code and CI/CD at the same location, so it vastly reduces
cognitive overhead. I am looking forward to moving more and more of our repos
over to Actions and discovering what other cool things we can do with them.

[triggering-workflows]: <https://docs.github.com/en/actions/reference/events-that-trigger-workflows#triggering-new-workflows-using-a-personal-access-token>
[context-expressions]: <https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions>
