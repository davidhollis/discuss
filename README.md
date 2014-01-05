# Discuss-o-matic

A small tool to help facilitate and guide group discussions.


## Dependencies

For development, you'll first need nodejs. Then install the npm package `meteorite` and [Meteor][meteor] itself.

To deploy, you'll just need the Heroku command-line tools.

[meteor]: https://www.meteor.com/


## Deploying to Heroku

Make sure you're logged in to Heroku. Clone the repository, then set up a Heroku instance using [oortcloud's Meteor buildpack][oortcloud-meteor]:

```shell
git clone https://github.com/davidhollis/discuss.git
cd discuss/
heroku create --stack cedar --buildpack https://github.com/oortcloud/heroku-buildpack-meteorite.git
```

Make a note of the URL that Heroku assigns, then configure the instance:

```shell
heroku config:add ROOT_URL=(the URL that Heroku assigned)
```

From there, you're ready to push.

```shell
git push heroku master
```

Because the buildpack automatically adds the
MongoDB development add-on, you'll need to have [verified your account][heroku-verify]. Don't worry, though; the add-on is free.

[oortcloud-meteor]: https://github.com/oortcloud/heroku-buildpack-meteorite
[heroku-verify]: http://devcenter.heroku.com/categories/billing


## Usage

Click the buttons to do things. Click points to change their color (green = positive, red = negative, blue = neutral).

Reload the page to clear everything.


## License

> Copyright (c) 2014, David Hollis
> All rights reserved.
> 
> Redistribution and use in source and binary forms, with or without
> modification, are permitted provided that the following conditions are met: 
> 
> 1. Redistributions of source code must retain the above copyright notice, this
>    list of conditions and the following disclaimer. 
> 2. Redistributions in binary form must reproduce the above copyright notice,
>    this list of conditions and the following disclaimer in the documentation
>    and/or other materials provided with the distribution. 
> 
> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
> ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
> WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
> DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
> ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
> (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
> LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
> ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
> (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
> SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.