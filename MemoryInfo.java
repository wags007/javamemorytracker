import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.util.ArrayList;
import java.util.List;

public class MemoryInfo {
    private static List<byte[]> leakyList = new ArrayList<>();

    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        
        // Check if the --leak argument is present
        boolean simulateLeak = args.length > 0 && args[0].equals("--leak");
        
        if (simulateLeak) {
            simulateMemoryLeak();
        }
        
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long maxMemory = runtime.maxMemory();
        
        MemoryUsage heapMemoryUsage = memoryBean.getHeapMemoryUsage();
        MemoryUsage nonHeapMemoryUsage = memoryBean.getNonHeapMemoryUsage();
        
        System.out.println("Total Memory: " + formatBytes(totalMemory));
        System.out.println("Free Memory: " + formatBytes(freeMemory));
        System.out.println("Max Memory: " + formatBytes(maxMemory));
        System.out.println("Used Memory: " + formatBytes(totalMemory - freeMemory));
        System.out.println("Heap Memory Usage:");
        System.out.println("  Init: " + formatBytes(heapMemoryUsage.getInit()));
        System.out.println("  Used: " + formatBytes(heapMemoryUsage.getUsed()));
        System.out.println("  Committed: " + formatBytes(heapMemoryUsage.getCommitted()));
        System.out.println("  Max: " + formatBytes(heapMemoryUsage.getMax()));
        System.out.println("Non-Heap Memory Usage:");
        System.out.println("  Init: " + formatBytes(nonHeapMemoryUsage.getInit()));
        System.out.println("  Used: " + formatBytes(nonHeapMemoryUsage.getUsed()));
        System.out.println("  Committed: " + formatBytes(nonHeapMemoryUsage.getCommitted()));
        System.out.println("  Max: " + formatBytes(nonHeapMemoryUsage.getMax()));
        System.out.println("Simulated Memory Leak Size: " + formatBytes(getLeakedMemorySize()));
    }
    
    private static String formatBytes(long bytes) {
        final long K = 1024;
        final long M = K * K;
        final long G = M * K;
        
        if (bytes / G > 0) {
            return String.format("%.2f GB", (double) bytes / G);
        } else if (bytes / M > 0) {
            return String.format("%.2f MB", (double) bytes / M);
        } else if (bytes / K > 0) {
            return String.format("%.2f KB", (double) bytes / K);
        } else {
            return bytes + " Bytes";
        }
    }

    private static void simulateMemoryLeak() {
        // Simulate a memory leak by adding a large byte array to the list
        byte[] leakyArray = new byte[100 * 1024 * 1024]; // 100 MB
        leakyList.add(leakyArray);
    }

    private static long getLeakedMemorySize() {
        return leakyList.size() * 100 * 1024 * 1024L; // Each element is 100 MB
    }
}
