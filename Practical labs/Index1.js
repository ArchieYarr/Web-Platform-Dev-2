const http = require('http');
http.createServer(function(req, res) {
path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();    
console.log('path is', path);

switch(path){
    case '':


 res.writeHead(200, { 'Content-type': 'text/plain' });
 res.end('Home page');
 break;

 case '/about':
 res.writeHead(200, { 'Content-type': 'text/plain' });
 res.end('About page');
 break;

 case '/guestbook':
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('guestbook');
    break;

 default:
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('Not Found');
    break;
}
}).listen(8000);
console.log('Server started on port 8000, ctrl^c to quit.'); 