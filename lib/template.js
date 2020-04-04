
var tamplate = {
    HTML: function(title, list, body, control){
        return `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <a href="/author">author</a>
            ${list}
            ${body}
            ${control}
        </body>
        </html>
    `;
    },
    list: function(topics){
        var list = '<ul>';
        for(var i = 0; i < topics.length; i++){
        list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
    }
        list = list+'</ul>';
        return list;
    },
    authorSelect:function(authors, author_id){
        var tag = '';
        var i = 0;
        while(i < authors.length){
        var selected = '';
        if(authors[i].id === author_id) {
            selected = ' selected';
        }
        tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
        i++;
        }
        return `
        <select name="author">
        ${tag}
        </select>
        `
    },authorTable: function(author){
        var tag ="";
        for(var i = 0; i < author.length; i++){
            tag +=`
            <tr>
                <td>${author[i].name}</td>
                <td>${author[i].profile}</td>
                <td><a href="/author/update?id=${author[i].id}">Update</td>
                <td>
                    <form action="/author/delete_process" method="post">
                        <p><input type="hidden" name="id" value="${author[i].id}"></p>
                        <p><input type="submit" value="delete"></P>
                    </form>
                </td>
            </tr>
            `
        }
        return `<table>${tag}</table>`
    }
}

module.exports = tamplate;
