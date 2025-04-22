
export class User {
    id: string;
    name: string;
    email: string;
    role: string;
    bio?: string;
    profile_image?: string;
    created_at: Date;
    updated_at: Date;
    
    constructor(
        id: string,
        name: string,
        email: string,
        role: string,
        bio?: string,
        profile_image?: string,
        created_at?: Date,
        updated_at?: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.profile_image = profile_image;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}
