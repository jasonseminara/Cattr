# Cattr
An app for finding cats in your area.

## Description
An Angular.js application that wraps a Python/Flask/SQLAlchemy+PostgreSQL API

## Features



### API
_Note: the API **cannot** contain a trailing slash!_
- /api/cats/:id
- /api/tags/:id
- /api/users/:id
- /api/availability/:id

### RSS Feed
Each Cat's availabilitly can be read from either the API or an XML/atom RSS feed
- /cats/<int:catid>/recent.atom

## Known Issues
- Login is not yet implemented; *All operations are in the context of User 1*
- Tags do not save when a Cat is first created.

## Usage
  1. From _My Account_,  
    2. Create a new Cat.
    1. View my upcoming reservations
    2. view my cats
    3. delete a cat
    4. view my address
  2. From the /#/cats/<int:id> view, you can
    2. edit this Cat's name/age/description
    3. delete this Cat
    1. create/delete availability
    2. inherit the owner's address
  1. View the Cats /#/cats/list (Cats will only show in this view if they have an active availability)
    1. Choose a date range to display Cats within the date range. 
  2. View cats by Tag /#/tags/<int:id>
  3. Reserve a Cat by clicking on its availability. 

## Next Features
- see open bugs and enhancements
