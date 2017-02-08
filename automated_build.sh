# Set up git
git config --global user.email "Technical@ddb.com.au"
git config --global user.name "CircleCI AutoBuilder"

# Import data and then build the project
ruby data_importer.rb
bundle exec jekyll build --trace

# Copy _site/* files to a temp location
mv _site /tmp/
mv readme.md /tmp/_site/

# Change to MASTER branch with a clean copy
git reset --hard
git checkout -f
git checkout master
git fetch origin master
git reset --hard origin/master

# Copy built site into MASTER branch
rm -rf * .bundle .sass-cache
mv /tmp/_site/* .

# Commit changes
git add -A .
CURDATE=$(TZ=":Australia/Sydney" date +'%r (%d-%m-%Y, %Z)')
git commit -m "Automated CircleCI rebuild at $CURDATE."
git push -f origin master

# Checkout back into the GH-PAGES-CI branch
git checkout gh-pages-ci
