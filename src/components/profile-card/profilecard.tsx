interface ProfileCardProps {
  name: string;
  title: string;
  photo: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, photo }) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="h-14 w-14 overflow-hidden rounded-full">
        <img
          src={photo}
          alt="Your profile"
          className="h-full w-full object-cover"
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
