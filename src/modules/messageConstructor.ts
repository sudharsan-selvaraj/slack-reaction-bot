export class MessageConstructor {

    public constructSendMessage(gifUrl) {
        var messageTemplate:any = {};
        messageTemplate.attachments = [
            {
                text: "Sent using slack-reactions!",
                image_url: gifUrl
            }
        ];
        messageTemplate.response_type = "in_channel";
        messageTemplate.replace_original = false;
        return messageTemplate;

    }

    public createPreviewMessage(gifObjects) {
        var messageTemplate:any = {};
        messageTemplate.attachments = [];
        messageTemplate.response_type = "ephemeral";
        messageTemplate.replace_original = true;

        if(!gifObjects.gifs.length) {
            messageTemplate.attachments.push({
                "text" : "Ahaan! No matching gif's found. Try with any other keyword.",
                "image_url" : "https://media1.tenor.com/images/2bf99e42b4b075956587c11e4d8b8bd2/tenor.gif?itemid=9452606"
            });
            return messageTemplate;
        }

        messageTemplate.text = "Holay! Pick your favourite one!";
        gifObjects.gifs.forEach(function (gif) {
            messageTemplate.attachments.push({
                "text": (gif.title || ""),
                "callback_id": gif.link,
                "thumb_url": gif.link,
                "actions": [
                    {
                        "name": "send",
                        "text": "send",
                        "type": "button",
                        "value": "send",
                        "style": "primary"
                        
                    }
                ]
            });
        });

        var moreContainer = {
            "text": "Looking for more gifs?",
            "callback_id" : gifObjects.currentPage,
            "actions": []
        };

        var next = {
            "name": "next",
            "text": "next",
            "type": "button",
            "value": gifObjects.keyWord,
        };
        var prev = {
            "name": "prev",
            "text": "prev",
            "type": "button",
            "value": gifObjects.keyWord,
        };

        if (gifObjects.hasPrevious) {
            moreContainer.actions.push(prev)
        }
        if (gifObjects.hasNext) {
            moreContainer.actions.push(next);
        }
        if (moreContainer.actions.length) {
            messageTemplate.attachments.push(moreContainer);
        }

        return messageTemplate;
    }

}