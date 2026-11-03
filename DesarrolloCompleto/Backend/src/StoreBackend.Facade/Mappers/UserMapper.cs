using StoreBackend.Dto;

namespace StoreBackend.Facade.Mappers;

public class UserMapper
{
    public static List<UserDto> ToDto(List<User> users)
    {
        return users.Select(u => ToDto(u)).ToList();
    }

    public static UserDto ToDto(User user)
    {
        return new UserDto
        {
            UserResourceId = user.UserResourceId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber
        };
    }
}
