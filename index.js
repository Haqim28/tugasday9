const { response } = require('express')
const express = require('express')
const app = express()
const port = 8000
let isLogin = true

//import connection database
const db = require('./connection/db')

app.set('view engine','hbs') 

app.use('/assets', express.static(__dirname + '/assets'))
app.use(express.urlencoded({extended: false}))



app.get('/', function(request,respond){
    db.connect(function(err,client,done){
        if(err) throw err
        client.query('SELECT * FROM tb_projects',function(err,result){
            if(err) throw err
            console.log(result.rows);
            let dataProjects = result.rows
            let data = dataProjects.map(function(item){
                return {
                    ...item,
                    isLogin,
                    duration: distance(item.start_date,item.end_date),
                }
            })
            respond.render('index', {isLogin , project:data} ); 
        })
    })

   
})

app.get('/add-project', function(request,respond){
    respond.render('addProject')
})

app.post('/add-project', function(request,respond){
})
app.get('/detail-project', function(request,respond){
    respond.render('projectDetail')
})

app.get('/delete-project/:index', function (request,respond) {

    respond.redirect('/')
})


app.get('/update-project/:index',function(request,respond){

})
app.post('/update-project/:index',function(request,respond){
 
})

app.get('/contact', function(request,respond){
    respond.render('contact')
})

app.get('/project-detail/:index', function(request,respond){

})

function distance(start,end){
    let bulan = 0;
	const date1 = new Date(start);
	const date2 = new Date(end);
	const time = Math.abs(date2 - date1);
	let days = Math.ceil(time / (1000 * 60 * 60 *24) );
	if(days<30){
		return `${days} Hari`
	
    }else 
		{	do{
				bulan++;
				days-=30;	
			}while(days>=30);
		}
    
    if(days==0 && bulan>0){
            return `${bulan} Bulan`
    }else
    return `${bulan} Bulan ${days} Hari`
}

function getTanggal(tanggal){
    let time = new Date(tanggal)

    let date = time.getDate()
    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let fulldate =  `${date} ${month[monthIndex]} ${year}`
    return fulldate
}
app.listen(port,function(){
    console.log(`Server running on port ${port}`);
})

