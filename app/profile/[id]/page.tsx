import { mockUsers, storage } from '@/lib/storage';
import UserProfileClient from './UserProfileClient';

export async function generateStaticParams() {
  // Use the mockUsers array directly or from your storage file
  const users = storage.getUsers();

  // If localStorage is empty at build time (which it will be), fallback to mock
  if (!users || users.length === 0) {
    return [
      { id: 'admin' },
      { id: 'user1' },
      // add others like user2 here if needed
    ];
  }

  return users.map(user => ({ id: user.id }));
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = storage?.getUserById(params.id);
  
if (!user) {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">User Not Found</h1>
      <p className="text-gray-500 mt-2">This user does not exist in the mock database.</p>
    </div>
  );
}

  const userFonts = storage.getFonts().filter(font => font.uploadedBy === user.id);
  const purchasedFonts = storage.getUserPurchases(user.id);
  console.log(mockUsers,'Mockuser',user)
  return (
    <UserProfileClient 
      user={user} 
      userFonts={userFonts}
      purchasedFonts={purchasedFonts}
    />
  );
}
