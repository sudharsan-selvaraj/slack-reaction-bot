var gifUrls = require("../../public/finalimageUrls.json");

export class GifFinder {

    public getGifs(pageNumber:number, count:number, searchKeyword?:string) {
        var filteredGifs = this.getGifByPage(this.filterGifsByKeyWord(searchKeyword), pageNumber, count);
        filteredGifs.keyWord =searchKeyword
        return filteredGifs;
    }

    private filterGifsByKeyWord(keyWord?:string) {
        var filteredGifs = gifUrls;
        if (!!keyWord) {
            return filteredGifs.filter(function (gifObject) {
                return gifObject.title.toLowerCase().includes(keyWord);
            });
        }
        return filteredGifs;
    }

    private getGifByPage(filteredGifs:any, page:number, pageCount:number) {
        var end = (page*pageCount),
            start = end -pageCount,
            out:any = {};
        out.gifs = filteredGifs.slice(start,end);
        out.hasNext = end<filteredGifs.length;
        out.hasPrevious = start >0;
        out.currentPage = page;
        return out;
    }

}