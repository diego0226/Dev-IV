using StoreBackend.Dto;

namespace StoreBackend.DomainService;

public interface IUserService
{
    Task<List<User>> GetAllAsync();
    Task<User?> GetByIdAsync(Guid userId);
    Task<User> AddAsync(UserDto user);
    Task DeleteAsync(Guid userId);
}
