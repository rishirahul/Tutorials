# Mongo DB 
#### steps after installation
* sudo service mongod start  // to start
* sudo service mongod stop
* sudo service mongod restart
* mongo // to use
* db.help()
* db.stats() 
* use DATABASE_NAME // create a db or move to existing db
* db // displays current db
* show dbs // all dbs containing something
* db.movie.insert("...")
* db.dropDatabase() // deletes db

## To create DB in a given directory
* sudo service mongod stop
* mongod --dbpath \<path\>
	* keep it running
* connect to db from another shell

## Hierarchy
* Database - db
	* collection 
		* Document -> key value of different types

### collections

While creating collection, two fields can be set:

* name of collection
* fields in the collection in form of document (i.e. json key value pair)


| field	| Type  |  Description |
|------------|:-------:|----------------:|
|capped | Boolean|  If true, enables a capped collection. Capped collection is a fixed size collection that automatically overwrites its oldest entries when it reaches its maximum size.|
|autoIndexID| Boolean | If true, automatically create index on _id field.s Default value is false.|
| size | number | Specifies a maximum size in bytes for a capped collection. If capped is true, then you need to specify this field also.|
| max | number | Specifies the maximum number of documents allowed in the capped collection. |

.
***db.createCollection(name, options)***
exmaples are:

*  db.createCollection("mycollection")
* db.createCollection("mycol", { capped : true, autoIndexID : true, size :  6142800, max : 10000 } )
* show collections

When collection is not created, mongodb autumatically inserts collection on insertion of document

***db.COLLECTION_NAME.drop()*** // deletes collection

### Documents
Documents are inserted in json format. 
Javascript data types are mostly valid

**Datatypes**

* String -- title: 'MongoDB Overview'
* Integer -- likes: 100
* Boolean --  "sale":true
* Double -- hit:  10.9
* Min/ Max keys -- 
* Arrays -- "employees":[ "John", "Anna", "Peter" ]
* Timestamp -- "ts" : Timestamp(1412180887, 1)
* Object -- "employee":{ "name":"John", "age":30, "city":"New York" }
* Null -- "middlename":null
* Date -- dateCreated: new Date(2013,11,10,2,35),
* Object ID -- _id: ObjectId(7df78ad8902c)
* Binary data 
* Code
* Regular expression

Standard insertion example is: 
```javascript
>db.post.insert([
   {
      title: 'MongoDB Overview', 
      description: 'MongoDB is no sql database',
      by: 'tutorials point',
      url: 'http://www.tutorialspoint.com',
      tags: ['mongodb', 'database', 'NoSQL'],
      likes: 100
   },
	
   {
      title: 'NoSQL Database', 
      description: 'NoSQL database doesn't have tables',
      by: 'tutorials point',
      url: 'http://www.tutorialspoint.com',
      tags: ['mongodb', 'database', 'NoSQL'],
      likes: 20, 
      comments: [	
         {
            user:'user1',
            message: 'My first comment',
            dateCreated: new Date(2013,11,10,2,35),
            like: 0 
         }
      ]
   }
])
```

##Querying a DB
***db.COLLECTION_NAME.find()***
*db.mycol.find().pretty()* -- displays collection content by prettifying it

*db.mycol.findOne().pretty()* -- displays only document in collection
 
*db.mycol.find({"key": {$eq:value})* -- documents with key = value

*db.mycol.find({"key": {$lte:value})* -- documents with key < value

*db.mycol.find({"key": {$lte:value})* -- documents with key <= value

*db.mycol.find({"key": {$gt:value})* -- documents with key > value

*db.mycol.find({"key": {$gte:value})* -- documents with key >= value

*db.mycol.find({"key": {$ne:value})* -- documents with key != value

*db.mycol.find({$and: [{key1: value1}, {key2:value2}]}).pretty()* -- and of two condition

similarly other operators are *$or*

*db.mycol.find({},{"title":1,_id:0})* -- displays title but doesn't display id is result

*db.COLLECTION_NAME.find().limit(NUMBER)* -- displays limited number of object

*db.COLLECTION_NAME.find().limit(NUMBER_L).skip(NUMBER_S)* -- skips first NUMBER_S objects and displays NUMBER_L objects

*db.COLLECTION_NAME.find().sort({KEY:1})* -- sort results of query according to a key

##Updating a document in DB
***db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)***

*db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}}* -- finds document which matches this criteria and updates **first** object matching this criteria

*db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}, multi:true}* -- finds document which matches this criteria and updates **all** object matching this criteria

To replace existing document with a new document passed in save:
***db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})***

##Delete document using mongo
 ***db.COLLECTION_NAME.remove(DELLETION_CRITTERIA)*** -- deletes all documents matching the criteria
  ***db.COLLECTION_NAME.remove(DELLETION_CRITTERIA, 1)*** -- deletes just one  document matching the criteria
  
## Indexing 
Necessary for fast and smooth accesss of data
***db.COLLECTION_NAME.ensureIndex({KEY:1})***
Parameter against key can be 1 (to sort in ascending order and -1 to sort in descending order. 
Multiple keys can also be passed to index. 
Visit Manpage and [tutorial ](https://www.tutorialspoint.com/mongodb/mongodb_indexing.htm) for more options

## Aggregation
Grouping values from multiple records and processing them together.
***db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)***

*db.mycol.aggregate[$$group:{_id : "$by_user", num_tutorial : {$sum : 1}}}])*
creates a group (group) and takes collection data and checks for condition "_id : by user" and counts the sum of documents satisfying this condition
Visit Manpage and [tutorial ](https://www.tutorialspoint.com/mongodb/mongodb_aggregation.htm) for more options

## Other important concepts 
Other important concepts are 
* replication: to backup data 
* Sharding: to store data accross multiple system as database gets bigger
