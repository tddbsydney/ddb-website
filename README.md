# DDB Website

This site is built with a combination of three different techs:

- [GitHub Pages](https://pages.github.com/) using [Jekyll](https://jekyllrb.com/) (static website generator)
- [Prismic.io](https://prismic.io/) (data generator)
- [CircleCI](https://circleci.com/) (Intermediary build manager)

Jekyll is used to generate a standard static website.

Prismic is used to generate data that the website uses. Devs can manage the data types, forms and validation, while non-devs can easily create data with said forms, ready to be exported.

CircleCI is used to merge these two techs together. When data is published on Prismic, or when GitHub recieves a push, a webhook is triggered on CircleCI - this makes CircleCI pull the repo down from GitHub, pull the data from Prismic, then commit and push the repo back up to GitHub.

GitHub will automatically "build" whatever Jekyll project is in the __master__ branch and host it as a static website. Github will also simply host whatever HTML files it finds in the master branch.

Therefore, these three main tech bundles work together to create a psuedo-CMS in a static website. This allows non-devs to "update" the website's information without needing any help from the dev team.

An article for this process is available [here at Contentful](https://www.contentful.com/developers/docs/ruby/tutorials/automated-rebuild-and-deploy-with-circleci-and-webhooks/) (we've since changed to Prismic, but the process remains the same).

## Setup

- Install Ruby (eg with [RVM](https://rvm.io/))
- In the repo, install Ruby stuff with **bundle install**

Everything else should work fine (unless you're on Windows)

## Dev Cycle

- Use **ruby data_importer.rb** to GET content data from Prismic.io
- Use **bundle exec jekyll serve** to start a localhost watcher and server (this can be accessed at **http://127.0.0.1:4000/**)
- Use **bundle exec jekyll build** to manually build a copy of the website (this will be compiled into /_site/)

Note that GitHub pages will automatically take whatever is in the **master** branch, compile it with Jekyll (if possible/required), and then host it - this means that as a developer:

- You should _never_ be making changes in the **master** branch, ever
- Once your stuff is feature complete, merge it into the **gh-pages-ci** branch and push it up (this will trigger a rebuild on the site)

## Non-Dev Cycle

- Log on to [prismic.io](https://prismic.io/)
- Modify data as you like
- Any time you **publish** or **unpublish** something, you will trigger a build on the site

Note that if you publish many things in quick succession, you will trigger multiple builds that will be queued up and eventually processed over time.

The current round-time for an update is about five minutes.
