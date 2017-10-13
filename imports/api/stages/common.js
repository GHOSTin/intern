export const Presentation = new FS.Collection("presentation", {
    stores: [new FS.Store.FileSystem("presentation", {path: "~/uploads"})]
});

Presentation.deny({
    insert(){
        return false;
    },
    update(){
        return false
    },
    remove() {
        return false;
    },
    download() {
        return false
    }
})

Presentation.allow({
    insert(){
        return true;
    },
    update(){
        return true
    },
    remove() {
        return true;
    },
    download() {
        return true
    }
});