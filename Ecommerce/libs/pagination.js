async function paginate(url,limit,page,model,query){
    const total = (await model.find(query)).length
    const totalPages = Math.ceil(total / limit)
    if(page>totalPages || page<1){
        return {
            success:false,
            message:"Page not found"
        }
    }

    const skip = (page-1)*limit
    
    const items = await model.find(query).skip(skip).limit(limit)

    const nextPage = page===totalPages ? null: limit===20?`${url}?page=${page+1}`:`${url}?page=${page+1}&limit=${limit}`
    const prevPage = page===1 ? null : limit===20?`${url}?page=${page-1}`:`${url}?page=${page-1}&limit=${limit}`

    return {
        success:true,
        data:items,
        total,
        page,
        prevPage,
        nextPage,
        totalPages
    }
}

module.exports = {
    paginate
}