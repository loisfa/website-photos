## Photo Gallery with Augmented Reality

### Multi-repo project
This project is made of 2 distinct Github projects:
- [Responsive Photo Gallery](https://github.com/loisfa/website-photos).
- [Augmented Reality Android app](https://github.com/loisfa/ar-photo-visu).

### Functional Use Case
This multi-modal project enables a user to <strong>select his favorite photos</strong> in a web gallery and then to <strong>preview them home via Augmtened Reality</strong>. Following are the different steps.
#### Step 1: Expore the Gallery
The user explores the photo gallery and 'likes' photos in the gallery.\
![Gallery Section](/website-photos/assets/images/gallery_section.png)\
\
Bigger preview and additional details about the photo (dimensions, price, ...) are available.
![Detailed Modal in Gallery Section](/website-photos/assets/images/gallery_section_with_modal.png)

#### Step 2: Generate your Code
The user generates a <strong>unique Code</strong> to 'save' the liked photos. These photos are saved on the webapp backend and attached to the <strong>unique Code</strong>.\
![My Favorites Section](/website-photos/assets/images/my_favorites_section.png)

#### Step 3: Install the AR app
The user downloads the Android APK, installs the app on his android phone then opens it.\
He will as well need to print a marker on paper, this is required for the Augmented Reality to work.

#### Step 4: AR Preview
The user types the <strong>unique Code</strong> (generated at step 2) in the Android app.\
All the 'liked' photos are then downloaded and the user can see them in his environment thanks to Augmented Reality. The photos are previewed at their real dimension.

#### Step Z: Bonus 
The use can also learn more about the artist in "The photographer" section of the website.
![The Photographer Section](/website-photos/assets/images/photographer_section.png)

### Technical Details
The <strong>Responsive Photo Gallery</strong> is made of an Angular frontend and a Node backend.\
The <strong>Augmented Reality Android app</strong> is a Unity built with Vuforia (Augmented Reality Plugin) app which targets Android platform.

### How to reuse this project?
The Photo Gallery is highly reusable. You can:
1. Download or Fork the [repository](https://github.com/loisfa/website-photos).
2. Change the .jpg photos inside /src/assets/photos and their .json description. You can add any number of photos inside here, the server will dynamically load them and send them to the frontend on the first user connection.
3. You can then deploy it on Heroku Platform as a simple [dyno](https://www.heroku.com/dynos) or another way on any other Cloud platform.
\ 
Note: make the android app work is more tricky as you will need to target the new public http endpoint to be able to retrieve the photos. Hence you will need to fork the project and change endpoint target and compile it again.
