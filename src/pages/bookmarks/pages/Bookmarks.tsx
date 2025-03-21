import MainLayout from "../../../components/MainLayout";
import { useGetBookmarks } from "../bookmarks.api";
import LoadingScreen from "../../../components/LoadingScreen";
import BookmarkCard from "../components/BookmarkCard";
import { Bookmark as BookmarkType } from "../bookmarks.types";

export function Bookmarks() {
  const { data: bookmarks, isLoading } = useGetBookmarks();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <MainLayout pageTitle="Bookmarks">
      {bookmarks.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No bookmarks found</div>
      ) : (
        <ul className="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px  -5 lg:px-10">
          {bookmarks.map((bookmark: BookmarkType) => (
            <BookmarkCard key={bookmark._id} bookmark={bookmark} />
          ))}
        </ul>
      )}
    </MainLayout>
  );
}

export default Bookmarks;
