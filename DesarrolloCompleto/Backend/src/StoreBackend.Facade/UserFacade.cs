using StoreBackend.DomainService;
using StoreBackend.Dto;
using StoreBackend.Exceptions;
using StoreBackend.Facade.Mappers;

namespace StoreBackend.Facade;

public class UserFacade : IUserFacade
{
    private readonly IUserService userService;
    private readonly AppDbContext context;

    public UserFacade(IUserService userService, AppDbContext context)
    {
        this.userService = userService;
        this.context = context;
    }

    public async Task<List<UserDto>> GetAllAsync()
    {
        var entities = await userService.GetAllAsync();
        return UserMapper.ToDto(entities);
    }

    public async Task<UserDto> GetByIdAsync(Guid userId)
    {
        var entity = await userService.GetByIdAsync(userId);
        if (entity == null) throw new ResourceNotFoundException();
        return UserMapper.ToDto(entity);
    }

    public async Task<UserDto> AddAsync(UserDto user)
    {
        var entity = await userService.AddAsync(user);
        await context.SaveChangesAsync();
        return UserMapper.ToDto(entity);
    }

    public async Task DeleteAsync(Guid userId)
    {
        await userService.DeleteAsync(userId);
        await context.SaveChangesAsync();
    }
}
