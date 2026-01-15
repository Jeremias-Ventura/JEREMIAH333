# HIDING HEADER FEATURE 
This feature hides the header in the home page when the user presses "start" on the timer, it hides the "JEREMIAH33:3" and the user menu/sign in. The header will reapper whenever the timer is not going, so if it is paused or hasnt been started yet it will show, it only hides when the timer is started.

# FILES TO MODIFY:
- Header.tsx: We will need to add a onHide state which will trigger it to hide when it is true. We'll also need to add a smooth animation when it hides and unhides, kind of how we have it in BibleVerse,tsx when generating a new verse. 
- Times.tsx: Here is what will make the onHide true, honestly all we have to do is make it so when start is pressed or when its running to make onHide in Header.tsx true.
