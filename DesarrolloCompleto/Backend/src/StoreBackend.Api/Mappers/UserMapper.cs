using System;
using StoreBackend.Api.Models.Requests;
using StoreBackend.Api.Models.Responses;
using StoreBackend.Dto;

namespace StoreBackend.Api.Mappers;

public class UserMapper
{
    public static UserDto ToDto(CreateUserRequestModel model)
    {
        return new UserDto
        {
            UserResourceId = model.UserResourceId!.Value,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email,
            PhoneNumber = model.PhoneNumber
        };
    }

    public static List<UserResponseModel> ToModel(List<UserDto> users)
    {
        return users.Select(u => ToModel(u)).ToList();
    }

    public static UserResponseModel ToModel(UserDto user)
    {
        return new UserResponseModel
        {
            UserResourceId = user.UserResourceId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber
        };
    }
}
