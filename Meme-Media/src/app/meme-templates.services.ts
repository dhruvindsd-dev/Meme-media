import { MemeModal } from './meme.modal';

export class MemeService{
    constructor(){
    }
    private Memes = [
        new MemeModal(
            'Leonardo Laughing' , 
            'Some description' , 
            '/assets/images/meme_templates/drake.jpg'
        ), 
        new MemeModal(
            'Emergency Meeting',
            'Some description', 
            'assets/images/meme_templates/emergency_meeting.jpg',
        ), 
        new MemeModal(
            'Papers Cat', 
            'Some description',
            'assets/images/meme_templates/papers_cat.jpg'
        ), 
        new MemeModal(
            'Thumbs Up Cat', 
            'Some description', 
            'assets/images/meme_templates/thumbs_up_cat.jpg'
        ), 
        new MemeModal(
           'Gentleman', 
           'Some description', 
           'assets/images/meme_templates/gentleman.png' 
        ), 
        new MemeModal(
            'Monkey Puppet', 
            "Some description", 
            'assets/images/meme_templates/monkey_puppet.jpg'
        ), 
        new MemeModal(
            'Mike', 
            'Some description', 
            'assets/images/meme_templates/mike.jpg'
        ), 
        new MemeModal(
            'Drake',
            'Some description', 
            'assets/images/meme_templates/drake.jpg'
        )
    ]
    
    getAllMemes(){
        return this.Memes
    }

}