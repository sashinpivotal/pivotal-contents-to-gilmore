# Hi Sang,
 
# The only script I have saved to my system is this one:
 
# $HTMLFILES=(Get-Content ".\List_of_HTML.txt")
# foreach ($FILE in $HTMLFILES) {
#     write-host "<itemref idref=`"$FILE`" linear=`"yes`" />" }
 
# All I did was gather this list of file that was in your zip package (with a Get-ChildItem) and then ran that list with something like the above to construct list of ids and idrefs in the opf file.
 
# I might have some time tomorrow to write a couple of the other things down and add some comments.

$HTMLFILES=(Get-Content ".\List_of_HTML.txt")
foreach ($FILE in $HTMLFILES) {
    write-host "<itemref idref=`"$FILE`" linear=`"yes`" />" }