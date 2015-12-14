from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

#from geography.models import ZipCode

class Cat(models.Model):
  SEX_CHOICES = (('','N/A'), ('M','Male'), ('F','Female'))

  name        = models.CharField(max_length=128)
  birthdate   = models.DateField(null=True)
  variety     = models.CharField(max_length=128)
  owner       = models.ForeignKey(User)
  sex         = models.CharField(max_length=1, choices=SEX_CHOICES, default='')
  tags        = TaggableManager()

  description = models.TextField()
  # zip_code = models.ForeignKey(
  #       ZipCode,
  #       on_delete=models.SET_NULL,
  #       blank=True,
  #       null=True,
  #   ) 
  last_updated = models.DateTimeField(auto_now=True)

  def __str__(self):
    return "{0} ({1})".format(self.name,self.owner.username)



class Availability(models.Model):
  cat   = models.ForeignKey(Cat,on_delete=models.CASCADE)
  start = models.DateField()
  end   = models.DateField()
  def __str__(self):
    return "{} {:%Y-%m-%d} : {:%Y-%m-%d} / {}".format(self.cat.name,self.start,self.end,self.cat.owner.username,)



class Reservation(models.Model):
  slot = models.OneToOneField(Availability,on_delete=models.CASCADE,null=True)
  cat = models.ForeignKey(
    Cat,
    on_delete=models.CASCADE,
    null=True, 
    related_name='cat_reservation'
  )
  host  = models.ForeignKey( User, null=True, blank=True, on_delete=models.SET_NULL)

  def __str__(self):
    return "{} {:%Y-%m-%d} : {:%Y-%m-%d} / {}".format(self.cat.name,self.slot.start,self.slot.end,self.cat.owner.username,)



class Posting(models.Model):
  author = models.ForeignKey(User)
  title = models.CharField(max_length=128)
  body  = models.TextField()
  start = models.DateTimeField(auto_now_add=True, blank=True)
  end   = models.DateTimeField(auto_now_add=True, blank=True)
  display = models.BooleanField()
  reservation = models.ForeignKey(Reservation,null=True,on_delete=models.SET_NULL)
  smokingEnviron = models.BooleanField(default="no")

  def __str__(self):
    return "{0} ({1})".format(self.title,self.author.username)



class Address(models.Model):

  STATE_CHOICES = (
        ('AK','Alaska'),
        ('AL','Alabama'),
        ('AR','Arkansas'),
        ('AS','American Samoa'),
        ('AZ','Arizona'),
        ('CA','California'),
        ('CO','Colorado'),
        ('CT','Connecticut'),
        ('DC','District of Columbia'),
        ('DE','Delaware'),
        ('FL','Florida'),
        ('GA','Georgia'),
        ('GU','Guam'),
        ('HI','Hawaii'),
        ('IA','Iowa'),
        ('ID','Idaho'),
        ('IL','Illinois'),
        ('IN','Indiana'),
        ('KS','Kansas'),
        ('KY','Kentucky'),
        ('LA','Louisiana'),
        ('MA','Massachusetts'),
        ('MD','Maryland'),
        ('ME','Maine'),
        ('MI','Michigan'),
        ('MN','Minnesota'),
        ('MO','Missouri'),
        ('MP','Northern Mariana Islands'),
        ('MS','Mississippi'),
        ('MT','Montana'),
        ('NA','National'),
        ('NC','North Carolina'),
        ('ND','North Dakota'),
        ('NE','Nebraska'),
        ('NH','New Hampshire'),
        ('NJ','New Jersey'),
        ('NM','New Mexico'),
        ('NV','Nevada'),
        ('NY','New York'),
        ('OH','Ohio'),
        ('OK','Oklahoma'),
        ('OR','Oregon'),
        ('PA','Pennsylvania'),
        ('PR','Puerto Rico'),
        ('RI','Rhode Island'),
        ('SC','South Carolina'),
        ('SD','South Dakota'),
        ('TN','Tennessee'),
        ('TX','Texas'),
        ('UT','Utah'),
        ('VA','Virginia'),
        ('VI','Virgin Islands'),
        ('VT','Vermont'),
        ('WA','Washington'),
        ('WI','Wisconsin'),
        ('WV','West Virginia'),
        ('WY','Wyoming')
  )
  user    = models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
  street  = models.CharField(max_length=100)
  city    = models.CharField(max_length=100)
  state   = models.CharField(max_length=2,choices=STATE_CHOICES, default='AK')
  zipcode = models.CharField(max_length=10)


  def __str__(self):
    return "{0}".format(self.user.username)

      