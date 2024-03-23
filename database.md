# Database Usign Mongose

## User Schema

- username (String)
- password (String)
- img-url (String)
- DOB (date)
- gender (boolean)
- isActive : (boolean/ false)
- isBlock : (boolean / false)
- location
- role : (enum : [vandor, Customer])

## users api

#### user signUp

- password increpted
- Email verificatio otp
- Dob valid date (date < cureent date )
- Profile Defalut Null
- allready exist or not end response

#### User Login

- Password Decrypt
- JWT TOEKN Genration and check

## Update user entities

- Passwrod,DOB,gender,profile update
- Block user
- Delete User
- Forgate password via otp.
- Google auth write in middleware

---

## Vandor

### Vandor shcema

- userID ref (for get user details )
- gst (nessusry)(string)
- v_address :[{}]
- rating 
- isVerify : {boolean / false}

## Vandor Operation / Api's

- mobile otp verification optional
- gst verification
- Go to request to admin for vandor verification
- If admin accept send massge to vandor request send you request accepted send msg email / mobile
- update address

## User Searching for Vendor

- by address (near by me )
- by category
- by keyword search
- suggestion near location vandor max 9 - 12
- show vandor details specific vandor when user click (by id)
- make option for call redoirect to phone call 
- user end enquiry to vandor send user email id and phon no and name to vandor 
- user add any vandor in there wishlist 
- optional (whatsapp chat redirect)

##
