export class GetUserDto {
    id: string;
    name: string;
    email: string;
    role: string;
    bio?: string;
    designation?: string;
    profile_image?: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: string,
        name: string,
        email: string,
        role: string,
        bio?: string,
        designation?: string,
        profile_image?: string,
        created_at?: Date,
        updated_at?: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.designation = designation
        this.profile_image = profile_image;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }

    // ---- GET methods ----

    getBasicInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
        };
    }

    getFullInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    getPublicProfile() {
        return {
            name: this.name,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
        };
    }
}
