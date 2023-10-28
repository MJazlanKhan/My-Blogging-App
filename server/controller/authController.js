import authModel from "../models/authModel.js"
import blogPostModel from "../models/blogPostModel.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
class AuthController {
    static userRegisteration = async (req, res) => {
        const { username, email, password, key } = req.body;
        try {
            if (username, email, password, key) {
                const isUser = await authModel.findOne({ email: email });
                if (!isUser) {
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashPassword = await bcryptjs.hash(password, genSalt);

                    const newUser = new authModel({
                        username: username,
                        email: email,
                        password: hashPassword,
                        key: key
                    })
                    const savedUser = await newUser.save()
                    if (savedUser) {
                        return res.status(200).json({ message: "Users Registration SUcessfully" })
                    }
                } else {
                    return res.status(400).json({ message: "Email Already Registered" })
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await authModel.findOne({ email: email })
                if (isEmail) {
                    if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {
                        const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                            expiresIn: "2d"
                        });
                        return res.status(200).json({
                            message: "Login Sucessfully",
                            token,
                            name: isEmail.username
                        });
                    } else {
                        return res.status(400).json({ message: "Wrong Credensitials" })

                    }
                } else {
                    return res.status(400).json({ message: "Email ID Not Found!!" })

                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }

    }
    static userReset = async (req, res) => {
        // const { email, newPassword, key } = req.body;
        const { email, key, newPassword } = req.body;

        // Check if the email and security key match
        const user = await authModel.findOne({ email, key });

        if (!user) {
            return res.status(401).json('Invalid email or security key');
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();
        res.send("sucessfully Reset The Password, Please Login !!")


    }
    static createBlogPost = async (req, res) => {
        const { title, summary, content, author, imageURL } = req.body;

        try {
            if (!title || !summary || !content || !author) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newBlogPost = new blogPostModel({
                title,
                summary,
                content,
                author,
                imageURL
            });
            const savedBlogPost = await newBlogPost.save();

            if (savedBlogPost) {
                return res.status(201).json({ message: "Blog post created successfully" });
            } else {
                return res.status(500).json({ message: "Failed to create a blog post" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static allPost = async (req, res) => {
        try {
            const blogPosts = await blogPostModel.find();
            res.status(200).json(blogPosts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static singlePost = async (req, res) => {
        // const { title, summary, content, author, imageURL } = req.body;

        try {
            const postId = req.params.postId;
            const blogPost = await blogPostModel.findById(postId);

            if (!blogPost) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            await blogPost.save();
            res.status(200).json(blogPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static updatePost = async (req, res) => {
        try {
            const postId = req.params.postId;
            const updatedTitle = req.body.title;
            const updatedSummary = req.body.summary;
            const updatedContent = req.body.content;

            const updatedPost = await blogPostModel.findByIdAndUpdate(
                postId,
                {
                    title: updatedTitle,
                    summary: updatedSummary,
                    content: updatedContent,
                },
                { new: true } // Include this option if you want to return the updated document
            );

            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static deletePost = async (req, res) => {
        try {
            const postId = req.params.postId;

            const deletedPost = await blogPostModel.findByIdAndRemove(postId);

            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default AuthController