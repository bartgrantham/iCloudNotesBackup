# iCloudNotesBackup

## What is it?

An Open Scripting Architecture Javascript script that will connect to your running Notes.app on your desktop and make a barely-usable (but complete!) backup of all your notes.

You run it and it copies all the notes you have in iCloud into local directories and creates symlinks from their categories.  They can then be browsed or restored or whatever.

## Why?

Because Apple just can't get this right.  For as excellent as some of their products are, iCloud has some astonishingly stupid misfeatures.  One of these is that there's no "Time Machine" for iCloud, which seems to me like a pretty huge thing to forget.

One day I realized that a very, very critical note was missing from my iCloud sync'ed notes (perhaps I butt-deleted it?) and in a panic I called Apple Tech Support.  They were very friendly and offered to do a restore from their deep archival backup which would have unpredictale consequences for my iCloud account.  I was flabbergasted.  They don't have a DVCS that exploits CAS (the way git, mercurial, docker, etc. work) keeping track of everyone's stuff?  WTF?!  Do they just have a gigantic Oracle database that ticks forward for every update?

I asked them for the proper procedure to backup iCloud Notes and what did they tell me?  _Go through them one by one manuall and cut and paste them into individual text files_  No kidding.  That was the official recommendation for backing up iCloud Notes.  Cut and paste.

Dismayed but not deterred, I spelunked the depths of my iPhone's backups, and even dug into the Time Machine backups of my laptop that contained even older versions of my iPhone backups.  I was able to finally reconstruct the missing note and set out to make sure this didn't happen again.

So here we are.

**WARNING**: This could be super-duper dangerous to your iCloud Notes, and maybe more.  I am pretty confident it'll work well for you, but *I make no guarantees*.  You should probably make an initial manual backup (yes, that sucks, I know) before running this script.  Better safe than sorry, especially with alpha-grade software.

## How do I use it?

Well, for now you'll need to be a little sophisticated, which is nerdspeak for "you have to use the command line".

First, **make sure Notes.App is running and has synced with iCloud**.  This is necessary because Apple hasn't provided any official direct access to iCloud.  Period.  The only way this app can work right now is to automate an interaction with the actual Notes app.  This might be fragile, it might end up being more robust than an API Apple could provide to iCloud.  Doesn't matter, it's the only game in town right now.

Then you just run iCloudNotesBackup.js from the terminal and step back:

```bash
$ ./iCloudNotesBackup.js
2015-02-20 20:23:27.325 iCloudNotesBackup.js[10382:441061] warning: failed to get scripting definition from /usr/bin/osascript; it may not be scriptable.
Writing x-coredata://XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/IMAPNote/p749 (NYC Inventory) to __raw/x-coredata%3A%2F%2FXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX%2FIMAPNote%2Fp749
Writing x-coredata://XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/IMAPNote/p748 (Todo List) to __raw/x-coredata%3A%2F%2FXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX%2FIMAPNote%2Fp748
...
```

If you put this script in its own git repo, you could even automate the whole process with cron and doing something like `git add *; git commit -m"Sync for "`date +%Y%m%d%H%M%S``  (That's off the top of my head... you might want to test that and get back to me)

Oh, and sorry about that "failed to get scripting definition" warning.  OSA for Javascript is not well documented and there's a lot of sharp edges.  I expect that I'll continue to discover better ways of wrapping this up and making it cleaner, so hopefully this gets more refined over time.

If there are any features that anyone would like to see, just drop me a line with a description, open an issue, or send me a pull request.  And if you find bugs, definitely let me know ASAP.

Of course, the best solution would be for Apple to make this piece of software obsolete by rolling out "iCloud Time Machine"...

## TODO

* Deleted notes don't get removed  (will need to glob __raw/ and see what's not in `Notes.notes`)
* Deleted symlinks don't get removed  (will need to glob folders and see what's not in `Notes.folders[i].notes`)
* Deleted folders don't get removed

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)


Enjoy!

-Bart
