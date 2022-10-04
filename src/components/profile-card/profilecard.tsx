interface ProfileCardProps {
  name: string;
  title: string;
  photo: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, photo }) => {
  return (
    <div className="flex gap-3">
      <div className="flex items-center">
        <img
          src={photo}
          alt="Your profile"
          className="h-14 w-14 rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold">{name}</span>
        <span className="text-sm text-gray-500">{title}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
