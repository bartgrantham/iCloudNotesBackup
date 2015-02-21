#!/usr/bin/osascript -l JavaScript

var RAW_DIR = '__raw';

ObjC.import('Cocoa');
ObjC.import('stdlib');

var app = Application.currentApplication()
app.includeStandardAdditions = true

var Notes = Application('Notes');
//Notes.activate();

var note, note_filename, link_filename, body, folder, folder_name, out;

function eUC_plus(c) {  return (/[\-\_\.\!\~\*'\(\)]/.exec(c)) ? '%'+c.charCodeAt(0) : encodeURIComponent(c);  }
function sanitize(dirty) {  var clean='', i;  for(i in dirty)  clean += (/[A-Za-z0-9\-\._ ]/.exec(dirty[i])) ? dirty[i] : eUC_plus(dirty[i]);  return clean;  }

function sanitize_note_id(note_id) {
    if ( note_id.indexOf('x-coredata://') != 0 ) {  throw Exception('note_id ' +note_id+ " doesn't begin with x-coredata://");  }
    return sanitize(note_id.substring(13))
}

out = app.doShellScript('mkdir -p __raw');
for(i in Notes.notes) {
    note = Notes.notes[i];
    note_filename = RAW_DIR +"/"+ sanitize(note.id());
    body = $.NSString.alloc.initWithUTF8String(note.body());
    console.log('Writing ' +note.id()+ " (" +note.name()+ ") to " +note_filename);
    body.writeToFileAtomically(note_filename, true);
}

for(i in Notes.folders) {
    folder = Notes.folders[i];
    folder_name = sanitize(folder.container().name() +' - '+ folder.name());
    console.log('Creating directory ' +folder_name);
    out = app.doShellScript('mkdir -p "' +folder_name+ '"');
    for(j in folder.notes) {
        note = folder.notes[j];
        link_filename = folder_name +'/'+ sanitize(note.name()) +".html";
        note_filename = '../'+ RAW_DIR +"/"+ sanitize(note.id());
        console.log('Creating link from "' +link_filename+ '" to "' +note_filename+ '"');
        try {
            app.doShellScript('ln -s "' +note_filename+ '" "' +link_filename+ '"');
        } catch (e) {
        }
    }
}

//$.exit(0);
