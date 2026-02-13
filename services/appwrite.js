import { Client, Databases, Query, ID } from "react-native-appwrite";

// track searches made by a user
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query, movie) => {
  try {
    const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    if (results.documents.length > 0) {
      const existingMovie = results.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        { count: existingMovie.count + 1 },
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        title: movie.title,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmd.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getTrendingMovies = async () => {
  try {
    const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return results.documents;
  } catch (error) {
    throw error;
    return undefined;
  }
};

//check if a record has already been stored
//if a document is found increament the searchCount field
// if no document: create a new document in Appwrite database -> 1
