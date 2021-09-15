## Responsive Photo Gallery with Augmented Reality Preview

### Multi-repo project
This project is made of 2 distinct Github projects:
- [Responsive Photo Gallery](https://github.com/loisfa/website-photos).
- [Augmented Reality Android app](https://github.com/loisfa/ar-photo-visu).

### Functional Use Case
The intent of this multi-modal web app is to enable a user to select his favorite photo in a web gallery, and then to preview these photos home via Augmtened Reality to see how these would look like home.

Here are the different steps:
<strong>1. [desktop or mobile] on the webapp frontend,</strong> the user explores the photo gallery and 'likes' photos in the gallery.\
![Gallery Section](/website-photos/assets/images/gallery_section.png)\
Bigger preview and additional details about the photo (dimensions, price, ...) are available.
![Detailed Modal in Gallery Section](/website-photos/assets/images/gallery_section_with_modal.png)\
\
<strong>2. [desktop or mobile] on the webapp frontend,</strong> the user generates a <strong>unique Code</strong> to 'save' the liked photos. These photos are saved on the webapp backend and attached to the <strong>unique Code</strong>.\
![My Favorites Section](/website-photos/assets/images/my_favorites_section.png)\
\
<strong>3. \[mobile\] on the webappfrontend,</strong> the user downloads the Android APK, installs the app it on his android phone then opens it.\

<strong>4. [mobile] on the Android app,</strong> the user types the <strong>unique Code</strong> generated at step 2. All the 'liked' photos are then downloaded and the user can see them in his environment thanks to Augmented Reality. The photos are previewed at their real dimension.\
\
Extra step:
The use can also learn more about the artist in "The photographer" section of the website.
![The Photographer Section](/website-photos/assets/images/photographer_section.png)\

### Technical Details
The <strong>Responsive Photo Gallery</strong> is made of an Angular frontend and a Node backend.\
The <strong>Augmented Reality Android app</strong> is a Unity built with Vuforia (Augmented Reality Plugin) app which targets Android platform.\

### How to reuse it?
The Photo Gallery is highly reusable. You can
1. Fork/Download the [repository](https://github.com/loisfa/website-photos).\
2. Change the .jpg photos inside /src/assets/photos and their .json description. You can add any number of photos inside here, the server will dynamically load them and send them to the frontend on the first user connection.\
3. You can then deploy it on Heroku Platform as a simple [dyno](https://www.heroku.com/dynos) or another way on any other Cloud platform.\ 
Note: make the android app work is more tricky: you will need to target the new public http endpoint, hence you will need to fork it, change endpoint target and compile it again.
