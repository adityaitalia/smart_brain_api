const clarifai=require('clarifai');

const app = new Clarifai.App({
	apiKey: '19d846ac66bb4010a09df8359eb7702d'
});

const handleAPI=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('Unable to work with API'))
}

const handleEntries=(req,res,db)=>{
	const {id} = req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('Unable to get entries'))
}

module.exports={
	handleEntries,
	handleAPI
}